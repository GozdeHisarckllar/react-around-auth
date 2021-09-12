import { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import ConfirmationPopup from './ConfirmationPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCard, setDeletedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const [accountState, setAccountState] = useState("");

  useEffect(() => {
    api.getUserInfo()
    .then((info) => {
      setCurrentUser(info);
    })
    .catch((err) => console.log(err));
  }, []);

  function handleUpdateUser({name, about}) {
    setIsLoading(true);
    api.setUserProfileInfo({name, about})
    .then((editedInfo) => {
      setCurrentUser(editedInfo);
    })
    .then(() => closeAllPopups())
    .catch((err) => console.log(err))
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleUpdateAvatar({avatar}) {
    setIsLoading(true);
    api.setProfileAvatar({avatar})
    .then((editedInfo) => {
      setCurrentUser(editedInfo);
    })
    .then(() => closeAllPopups())
    .catch((err) => console.log(err))
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleAddPlaceSubmit({name, link}) {
    setIsLoading(true);
    api.addNewCard({name, link})
    .then((newCard) => {
      setCards([newCard, ...cards]);
    })
    .then(() => closeAllPopups())
    .catch((err) => console.log(err))
    .finally(() => {
      setIsLoading(false);
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((likeInfo) => {
      return likeInfo._id === currentUser._id;
    });

    api.changeLikeCardStatus(card._id, !isLiked)
    .then((updatedCard) => {
      setCards(cards.map((initialCard) => {
        return initialCard._id === card._id ? updatedCard : initialCard
      }));
    })
    .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api.removeCard(card._id)
    .then(() => {
      setCards(cards.filter((initialCard) => {
        return initialCard._id !== card._id;
      }))
    })
    .then(() => closeAllPopups())
    .catch((err) => console.log(err))
    .finally(() => {
      setIsLoading(false);
    });
  }

  useEffect(() => {
    api.getInitialCards()
    .then((cardData) => {
      setCards(cardData);
    })
    .catch((err) => console.log(err));
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(clickedCard) {
    setSelectedCard(clickedCard);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsConfirmationPopupOpen(false);
  }

  function handleRemoveCardClick(card) {
    setIsConfirmationPopupOpen(true);
    setDeletedCard(card);
  }

  function handleLogout() {
    setLoggedIn(false);
  }
  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} handleLogout={handleLogout} accountState={accountState}/>
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main
              cards={cards}
              onCardLike={handleCardLike}
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onEditAvatarClick={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onRemoveBtnClick={handleRemoveCardClick}
            />
            <Footer/>
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              isLoading={isLoading}
            />
            <AddPlacePopup 
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlaceSubmit={handleAddPlaceSubmit}
              isLoading={isLoading}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            <EditAvatarPopup 
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              isLoading={isLoading}
            />
            <ConfirmationPopup 
              isOpen={isConfirmationPopupOpen}
              onClose={closeAllPopups}
              card={deletedCard}
              onCardDelete={handleCardDelete}
              isLoading={isLoading}
            />
          </ProtectedRoute>
          <Route path="/signup">
            <Register onSetAccount={setAccountState}/>
          </Route>
          <Route path="/signin">
            <Login onSetAccount={setAccountState}/>
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
