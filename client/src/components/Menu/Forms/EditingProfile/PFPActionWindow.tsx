interface PFPActionWindowInterface {
  pfpActionWindow: boolean | string
  setPfpActionWindow: (value: boolean | string) => void
  newPFP: string | ArrayBuffer | null | undefined
  setNewPFP: (value: string | null) => void
}

export default ({ pfpActionWindow, setPfpActionWindow, newPFP, setNewPFP }: PFPActionWindowInterface) => {
  return (
    <div className={`dialog-cont ${typeof pfpActionWindow === "boolean" && pfpActionWindow ? "" : "hidden"}`}>
      <div className="bg" onClick={() => setPfpActionWindow(" ")} />
      <div className="dialog">
        <div className="window-title">Choose action</div>
        <div className="buttons-list">
          { newPFP && <button onClick={() => setPfpActionWindow(" ")} className="btn white transparent">View</button> }
          <button onClick={() => document.getElementById('pfpInput')?.click()} className="btn white transparent">{ newPFP ? "Replace" : "Upload" }</button>
          { newPFP && <button onClick={() => setNewPFP(null)} className="btn red transparent">Delete</button> }
        </div>
      </div>
    </div>
  )
}