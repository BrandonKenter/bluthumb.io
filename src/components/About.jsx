const About = () => {
  return (
    <div className="py-8 px-20 max-w-7xl flex justify-center items-center mx-auto">
      <div>
        <h1 className="text-center text-3xl font-extrabold mt-4 mb-8 dark:text-slate-200">
          About BluThumb.io
        </h1>
        <h2 className="text-2xl font-extrabold mt-8 mb-2 dark:text-slate-300">
          How BluThumb.io came to be...
        </h2>
        <p className="dark:text-slate-400">
          I started my LeetCode journey in the summer of 2022, and for the first
          few months I thought I wasn't retaining the information I was learning
          and didn't feel like I was improving. It felt like no matter how well
          I understood the solution to a problem, a few days would pass and I
          wouldn't be able to solve it again. After solving over 150 problems, I
          came across a{" "}
          <a
            className="text-blue-700 dark:text-blue-600 cursor-pointer hover:underline"
            rel="external nofollow noopener"
            target="_blank"
            href="https://www.youtube.com/watch?v=Z-zNHHpXoMM"
          >
            YouTube video
          </a>{" "}
          by Ali Abdall titled "How to Study for Exams - Spaced Repetition |
          Evidence-based revision tips." In it, Ali described how actively
          recalling information via spaced repetitions is important for
          retaining information. I also learned about the forgetting curve,
          which essentially outlines the timeline for loss of memory of
          information if it is not recalled. These two ideas transformed my
          approach to studying. I immediately started to record all of my
          progress using a spreadsheet. For each problem I would record all of
          its information, the date I completed it and a brief note to describe
          any key parts of the solution. Eventually I also started to color code
          each problem to signify my confidence with the solution. Fast forward
          to Janurary 2023, I completed close to 1000 LeetCode problems and had
          a spreadsheet entry for each one. During this process I realized that
          no platform provides adequate tools to facilitate spaced repetition
          learning. Every platform I have used only allows the user to tag a
          problem as either completed or not completed and either doesn't have
          the ability to write notes, or the notes are not easily accessible
          from the problem list. The desire for these tools is why I developed
          BluThumb.io.
        </p>

        <h2 className="text-2xl font-extrabold mt-8 mb-2 dark:text-slate-300">
          What does BluThumb.io do better?
        </h2>
        <h3 className="text-lg font-bold dark:text-slate-300">Thumb colors</h3>
        <p className="dark:text-slate-400">
          If you've solved LeetCode problems before, you'll know that there is a
          wide spectrum of confidence you'll have with various problems. It
          isn't sufficient to simply label a problem as completed or not
          completed. If you only have access this binary metric and come back to
          a problem for review in a week or a month, you have no easily visible
          indication of how confident you were with solving the problem the last
          time you encountered it. This is why the thumb color feature on
          BluThumb.io is so useful. Each problem can be easily tagged by
          coloring the row for that problem and acts as a metric for your
          confidence with the problem. On BluThumb.io, we have four thumb color
          options: white (no thumb selected), blue, green and red. It is also
          worth noting that associating thumb colors to confidence level is
          merely a suggestion. Every user can associate the colors with any
          metric they want. You can use it as a representation of how fast you
          can complete the problem, how many mistakes you make when attempting
          to solve the problem, the efficiency of your solution for the problem
          etc.
        </p>
        <h3 className="text-lg font-bold mt-3 dark:text-slate-300">Notes</h3>
        <p className="dark:text-slate-400">
          In addition to having a more versatile metric with each problem,
          having notes associated with each problem is vital to efficiently
          recalling important information. When you first start solving LeetCode
          problems, you are taking in a lot of new information. Writing simple
          code snippets such as using two pointers to reverse an array or binary
          search is not something that will be automatic and will take time to
          get good at. But as you solve more problems, a lot of the code needed
          for each solution becomes automatic due to repetition across many
          similar problems. This is the point in your learning where it is often
          the trick of a problem that stumps you. After about 500 problem
          solved, I noticed that if I understood the trick to a problem or even
          the general approach, I would almost always be able to come up with an
          efficient solution. And this is where the notes feature becomes
          extremely useful. With a quick glance the user can perform a
          repetition on the important information of a problem without having to
          look through the code and remember the trick. Certain formulas such as
          the sum of values from 1 to n, the number of subarrays in an array of
          length n, or how to check if a row-column pair in a matrix is a part
          of the main positive diagonal or main negative diagonal are examples
          of simple information/tricks that form the basis of a problem and can
          be described in a few lines of text, and having access to this
          information quickly is important for efficient studying with spaced
          repetition.
        </p>
        <h3 className="text-lg font-bold mt-3 dark:text-slate-300">
          Filtering
        </h3>
        <p className="dark:text-slate-400">
          If you're feeling confident and would like to try your hand at some
          problems that have been stumping you for a while, or you are tired and
          just want to relax and do some spaced repetition learning on problems
          you have already solved, filtering by thumb color is a great tool to
          make this easier.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-2 dark:text-slate-300">
          Features coming soon:
        </h2>
        <ul className="ml-8 list-disc">
          <li className="dark:text-slate-400">
            <b>Date column</b> - Assign a date to each problem to make planning
            spaced repetitions easier.
          </li>
          <li className="dark:text-slate-400">
            <b>Provided problem notes</b> - Allow users to use the notes I have
            created for each problem.
          </li>
          <li className="dark:text-slate-400">
            <b>More problems</b> - I have notes on over 1000 problems and plan
            on adding entries for all of the problems that have unique concepts.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
