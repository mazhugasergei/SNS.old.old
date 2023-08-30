export default () => {
  return (
    <main className="log-in_sign-up wrapper">
      <div className="title">Create your account</div>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Repeat password" />
        <div className="not-a-robot">
          <input type="checkbox" id="notRobotCheckbox" />
          <label htmlFor="notRobotCheckbox">
            <div className="checkbox" />
            <span>I'm not a robot</span>
          </label>
        </div>
        <button className="btn">Sign up</button>
      </form>
    </main>
  )
}