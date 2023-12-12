function Modal(props) {
    const { open, onClose } = props
  
    // Add is-active is modal opened
    const classActive = open ? 'is-active' : ''
  
    return (
      <div className={`modal ${classActive}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Modal title</p>
            <button
              onClick={onClose}
              className="delete"
              aria-label="close"
            />
          </header>
          <section className="modal-card-body">
            <h1>Add Item</h1>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input className="input" type="text" placeholder="Input name" />
              </div>
            </div>
            <div className="field">
              <label className="label">Price</label>
              <div className="control">
                <input className="input" type="number" placeholder="Input price" />
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button onClick={onClose} className="button is-success">
              Save changes
            </button>
            <button onClick={onClose} className="button">
              Cancel
            </button>
          </footer>
        </div>
      </div>
    );
  }
  
  export default Modal