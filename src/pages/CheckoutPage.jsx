import { useState } from "react";

function CheckoutPage() {


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

  return (

    <>
      <div className="d-flex justify-content-center align-items-center gradient-bg" style={{ height: "100vh" }}>
        <div
          className="container border rounded p-4 shadow-sm bg-light"
        >
          <form className="row g-3">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">Nome</label>
              <input type="text" className="form-control" id="name" />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputEmail4" className="form-label">Email</label>
              <input type="email" className="form-control" id="inputEmail4" />
            </div>
            <div className="col-12">
              <label htmlFor="inputAddress" className="form-label">Indirizzo</label>
              <input type="text" className="form-control" id="inputAddress" placeholder="Via ..." />
            </div>
            <div className="col-12">
              <label htmlFor="inputAddress2" className="form-label">Dettagli di consegna</label>
              <input type="text" className="form-control" id="inputAddress2" placeholder="Appartamento, scala, piano" />
            </div>
            <div className="col-md-8">
              <label htmlFor="inputCity" className="form-label">Città</label>
              <input type="text" className="form-control" id="inputCity" />
            </div>
            <div className="col-md-4">
              <label htmlFor="inputState" className="form-label">Regione</label>
              <select id="inputState" className="form-select">
                <option value="">-- Seleziona una regione --</option>
                <option value="ABR">Abruzzo</option>
                <option value="BAS">Basilicata</option>
                <option value="CAL">Calabria</option>
                <option value="CAM">Campania</option>
                <option value="EMR">Emilia-Romagna</option>
                <option value="FVG">Friuli-Venezia Giulia</option>
                <option value="LAZ">Lazio</option>
                <option value="LIG">Liguria</option>
                <option value="LOM">Lombardia</option>
                <option value="MAR">Marche</option>
                <option value="MOL">Molise</option>
                <option value="PMN">Piemonte</option>
                <option value="PUG">Puglia</option>
                <option value="SAR">Sardegna</option>
                <option value="SIC">Sicilia</option>
                <option value="TOS">Toscana</option>
                <option value="TAA">Trentino-Alto Adige</option>
                <option value="UMB">Umbria</option>
                <option value="VDA">Valle d'Aosta</option>
                <option value="VEN">Veneto</option>
              </select>
            </div>
            <div className="col-12 mt-5">
              <button type="submit" className="btn btn-primary">Completa il Pagamento</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}


export default CheckoutPage