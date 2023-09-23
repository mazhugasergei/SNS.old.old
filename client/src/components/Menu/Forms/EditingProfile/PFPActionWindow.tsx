interface PFPActionWindowInterface {
  pfpActionWindow: boolean | string
  setPfpActionWindow: (value: boolean | string) => void
  setNewPFP: (value: string | null) => void
}

export default ({ pfpActionWindow, setPfpActionWindow, setNewPFP }: PFPActionWindowInterface) => {
  return (
    <div className={`dialog-cont ${typeof pfpActionWindow === "boolean" && pfpActionWindow ? "" : "hidden"}`}>
      <div className="bg" onClick={() => setPfpActionWindow(" ")} />
      <div className="dialog">
        <div className="window-title">Choose action</div>
        <div className="buttons-list">
          <button onClick={() => setPfpActionWindow(" ")} className="btn white transparent">View</button>
          <button onClick={() => document.getElementById('pfpInput')?.click()} className="btn white transparent">Replace</button>
          <button onClick={() => setNewPFP(null)} className="btn red transparent">Delete</button>
        </div>
      </div>
    </div>
  )
}