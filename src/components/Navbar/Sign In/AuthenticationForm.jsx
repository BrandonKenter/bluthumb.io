import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState, useEffect } from "react";
import { bluthumbProblems, blind75Problems } from "../../../Problems";
import { auth } from "../../../../firebase-config";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

export function AuthenticationForm({
  currentList,
  setCurrentList,
  setSignInFormOpened,
  formError,
  setFormError,
  setListLoading,
}) {
  const [formType, setFormType] = useState("signIn");

  useEffect(() => {}, [formType]);

  // Switch sign in form to sign up form
  const handleSignUpSwitchClick = () => {
    setFormError(false);
    setFormType("register");
  };

  // Switch sign up form to sign in form
  const handleFormSignInSwitchClick = () => {
    setFormError(false);
    setFormType("signIn");
  };

  // Sign up/sign in user using email/password auth
  const handleFormSubmit = async (values) => {
    // Register user
    if (formType === "register") {
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = result.user;
        const usersRef = collection(db, "users");
        await setDoc(doc(usersRef, user.uid), {
          profileName: values.username,
        });
        initializeListInfo(user);
        setSignInFormOpened(false);
        setFormError(false);
        updateProfile(auth.currentUser, { displayName: values.username });
      } catch (error) {
        console.log("Error with user registration: " + error);
        setFormError(true);
      }
    } else {
      // Sign in user
      try {
        const result = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const user = result.user;
        initializeListInfo(user);
        setSignInFormOpened(false);
        setFormError(false);
      } catch (error) {
        console.log("Error with signing in via email/password: " + error);
        setFormError(true);
      }
    }
  };

  // Sign up/sign in user using Google auth
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      initializeListInfo(user);
      setSignInFormOpened(false);
      setFormError(false);
    } catch (error) {
      console.log("Error with signing in with Google: " + error);
    }
  };

  // Initialize the list collections and documents (if it is the user's first log in) and
  // force set the currentList to the "bluthumb300" list
  const initializeListInfo = async (user) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const subcollections = await getDocs(
        collection(userRef, "leetcode_lists")
      );

      // If first log in, initialize list collections and documents
      if (subcollections.empty) {
        setListLoading(true);
        const leetcodeListsRef = collection(userRef, "leetcode_lists");
        const bluThumbCounts = { blue: 0, green: 0, red: 0, white: 300 };
        const blindThumbCounts = { blue: 0, green: 0, red: 0, white: 75 };

        // Creat bluthumb 300 document with a collection of problem documents
        const bluthumbList = doc(leetcodeListsRef, "bluthumb300");

        const bluthumbProblemsRef = collection(bluthumbList, "problems");
        const bluthumbSetDocs = [
          setDoc(bluthumbList, bluThumbCounts, { merge: true }),
          ...bluthumbProblems.map((problem) =>
            setDoc(doc(bluthumbProblemsRef), problem)
          ),
        ];

        // Create blind 75 document with a collection of problem documents
        const blind75Ref = doc(leetcodeListsRef, "blind75");
        const blind75ProblemsRef = collection(blind75Ref, "problems");
        const blind75SetDocs = [
          setDoc(blind75Ref, blindThumbCounts, { merge: true }),
          ...blind75Problems.map((problem) =>
            setDoc(doc(blind75ProblemsRef), problem)
          ),
        ];

        // Wait for all setDoc calls to finish
        await Promise.all([...bluthumbSetDocs, ...blind75SetDocs]);
        setListLoading(false);
      }

      // Force list to be "bluthumb300" on sign in
      setCurrentList("bluthumb300");
    } catch (error) {
      console.log("Error with setting list and thumb info: " + error);
    }
  };

  return (
    <div className="">
      {formType === "signIn" ? (
        <SignInForm
          handleSignUpSwitchClick={handleSignUpSwitchClick}
          handleFormSubmit={handleFormSubmit}
          signInWithGoogle={signInWithGoogle}
          formError={formError}
        />
      ) : (
        <SignUpForm
          handleFormSignInSwitchClick={handleFormSignInSwitchClick}
          handleFormSubmit={handleFormSubmit}
          formError={formError}
        />
      )}
    </div>
  );
}
