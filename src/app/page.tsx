import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>

      <div className={styles.code}>
        <p>Frontend Engineer Take Home Project</p>
      </div>
      
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/classkick.png"
          alt="Classkick Logo"
          width={200}
          height={50}
          priority
        />
      </div>

      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
      </div>

      <br></br>

      <div className={styles.description}>
        <p>
          Details of project requirements are at:&nbsp;
          <code className={styles.code}>README.md</code>
        </p>
      </div>

      <br></br>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>
            Motivation <span>-&gt;</span>
          </h2>
          <p>At Classkick, our teachers and students LOVE using our 
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial"> Canvas </a> 
            feature to create fun and engaging content. <br></br><br></br>
            This project emulates the type of scenarios we face at Classkick, with similar technical challenges regarding UI and real-time UX.
          </p>
        </div>

        <div className={styles.card}>
          <h2>
            Goals <span>-&gt;</span>
          </h2>
          <p>Your task is to create Canvas element to:<br></br><br></br>
            - Create a `Drawing` <br></br>
            - Create a `Textbox` <br></br>
            - Add an `Eraser Tool`
          </p>
        </div>

        <div className={styles.card}>
          <h2>
            Requirements <span>-&gt;</span>
          </h2>
          <p>
            - Your app does NOT have to be hooked up to a backend and thus it does NOT have to preserve state. <br></br><br></br>
            - It should be clear in your code and/or documentation on areas of design and technical decisions <br></br><br></br>
            - Create components as you feel is best suited for your solution. <br></br>
          </p>
        </div>

        <div className={styles.card}>
          <h2>
            Helpful links <span>-&gt;</span>
          </h2>
          <p>
            - <a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial"> Canvas API </a><br></br><br></br>
            - <a href='https://react.dev/learn/start-a-new-react-project#nextjs'>React/Next JS Tutorial</a> <br></br>
          </p>
        </div>
      </div>

      <br></br><br></br>
      <h3>Mock &nbsp;</h3>
      <div className={styles.center}>
        
        <Image
          src="/classkick-take-home.png"
          alt="Classkick Take Home"
          width={450}
          height={350}
          priority
        />
      </div>
      {/* added this html reference to use free the icons */}
      <a href="https://www.flaticon.com/free-icons/font" title="font icons">Font icons created by Freepik - Flaticon</a>
    </main>
  )
}
