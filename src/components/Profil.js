import axios from 'axios'
import ProfilAdmin from './ProfilAdmin'
import ProfilChangeAvatarAddArticle from './ProfilChangeAvatarAddArticle'
import ProfilUser from './ProfilUser'
import { useState, useEffect } from 'react'
import './styles/Profil.css'

const Profil = (props) => {
  const [stokage, setStokage] = useState([])
  const [reveal, setReveal] = useState(false)
  const [bdd, setBdd] = useState([])
  const [moreArticle, setMoreArticle] = useState(12)
  const [bddChange, setBddChange] = useState(false)

  const deleteArticle = (params) => {
    axios.delete('http://localhost:3030/articles/delete', {
      data: { id: params },
    }) && setBddChange(!bddChange)
  }

  const seeMoreArticle = () => setMoreArticle(moreArticle + 12)

  useEffect(() => {
    if (localStorage.getItem('admin') == 1) {
      props.setAdmin(true)
    }
  }, [])

  useEffect(() => {}, [stokage, bdd])

  useEffect(() => {
    if (props.admin && reveal) {
      axios
        .get('http://localhost:3030/articles/godmode/read')
        .then((response) => response.data)
        .then((data) => setBdd(data)) && console.log('pouet')
    }
    if (!props.admin && reveal) {
      axios
        .post('http://localhost:3030/articles/byuser', {
          id_users: parseInt(localStorage.getItem('id_user')),
        })
        .then((response) => response.data)
        .then((data) => setStokage(data))
    }
  }, [bddChange])

  return (
    <div className='profil'>
      <h2 className='textProfilPage' id='h2Profil'>
        Bienvenue {localStorage.getItem('name')}
      </h2>
      <ProfilChangeAvatarAddArticle
        setAvatar={props.setAvatar}
        setBddChange={setBddChange}
        bddChange={bddChange}
      />
      {props.admin ? (
        <ProfilAdmin
          bdd={bdd}
          stokage={stokage}
          moreArticle={moreArticle}
          deleteArticle={deleteArticle}
          admin={props.admin}
          setReveal={setReveal}
          setBdd={setBdd}
          setStokage={setStokage}
          reveal={reveal}
        />
      ) : (
        <ProfilUser
          bdd={bdd}
          stokage={stokage}
          moreArticle={moreArticle}
          deleteArticle={deleteArticle}
          admin={props.admin}
          setReveal={setReveal}
          setBdd={setBdd}
          setStokage={setStokage}
          reveal={reveal}
        />
      )}
      <div className={reveal ? 'buttonSeeMoreProfil' : 'cache'}>
        <button
          className='buttonSeeMoreProfil buttonConnect'
          onClick={seeMoreArticle}
        >
          Voir plus
        </button>
      </div>
      <div className='messageMobileProfil'>
        <h4 className='textProfilPage'>
          Accédez à plus d'options via notre version desktop !
        </h4>
      </div>
    </div>
  )
}

export default Profil
