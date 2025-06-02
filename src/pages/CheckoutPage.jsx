


function CheckoutPage(){


      const [formData, setFormData] = useState({
    author: '',
    title: '',
    body: '',
    public: true
  });


  function handleFormdData(e) {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setFormData((formData) => ({
      // value conterra il valore o del checkbox o del form
      ...formData, [e.target.name]: value
    }));

  }
  console.log(formData)

//   function sendForm(e) {
//     e.preventDefault()
//     axios.post("https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts", formData)
//       .then((response) => {
//         console.log(response.data)
//         alert("Form inserito con successo")
//       })
//       .catch((error) => {
//         console.error(error)
//         alert("Errore durante l'invio del form")
//       })

//   }

    return(

        <>
        <div className="d-flex justify-content-center align-items-center gradient-bg" style={{ height: "100vh" }}>
  <div
    className="border rounded p-4 shadow-sm bg-light"
    style={{ width: "500px", height: "450px", overflowY: "auto" }}
  >
    <form onSubmit={sendForm}>
      <div className="mb-3">
        <label htmlFor="author" className="form-label">Autore</label>
        <input
          type="text"
          className="form-control"
          id="author"
          name="author"
          value={formData.author}
          placeholder="Inserisci autore"
          onChange={handleFormdData}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">Titolo</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={formData.title}
          placeholder="Inserisci titolo"
          onChange={handleFormdData}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="body" className="form-label">Testo</label>np
        <textarea
          className="form-control"
          id="body"
          name="body"
          value={formData.body}
          placeholder="Inserisci il contenuto del post"
          onChange={handleFormdData}
          rows="2"
        ></textarea>
      </div>

      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="public"
          name="public"
          checked={formData.public}
          onChange={handleFormdData}
        />
        <label className="form-check-label" htmlFor="public">Pubblic</label>
      </div>

      <button type="submit" className="btn btn-primary w-100">Invia</button>
    </form>
  </div>
</div>
        </>
    )
}


export default CheckoutPage