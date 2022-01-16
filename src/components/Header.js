import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Header = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      signOut(auth);
    }
  };

  return (
    <HeaderContainer>
      <Link to="/">
        <AmazonLogo src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" />
      </Link>
      <HeaderSearch>
        <SearchInput type="text" />
        <Icon />
      </HeaderSearch>
      <HeaderNav>
        <Link to={!user && "/login"}>
          <HeaderOption onClick={handleAuthentication}>
            <HeaderOptionLineOne>
              Hello {user ? user.email : "Guest"}
            </HeaderOptionLineOne>
            <HeaderOptionLineTwo>
              {user ? "Sign Out" : "Sign In"}
            </HeaderOptionLineTwo>
          </HeaderOption>
        </Link>
        <Link to="/orders">
          <HeaderOption>
            <HeaderOptionLineOne>Returns</HeaderOptionLineOne>
            <HeaderOptionLineTwo>Orders</HeaderOptionLineTwo>
          </HeaderOption>
        </Link>
        <HeaderOption>
          <HeaderOptionLineOne>Your</HeaderOptionLineOne>
          <HeaderOptionLineTwo>Prime</HeaderOptionLineTwo>
        </HeaderOption>
      </HeaderNav>
      <Link to="/checkout">
        <HeaderOptionBasket>
          <ShoppingBasketIcon />
          <HeaderOptionLineTwo className="header__basketCount">
            {basket?.length}
          </HeaderOptionLineTwo>
        </HeaderOptionBasket>
      </Link>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #131921;
  position: sticky;
  top: 0;
  z-index: 50;
`;

const AmazonLogo = styled.img`
  width: 100px;
  object-fit: contain;
  margin: 0 20px;
  margin-top: 18px;
`;

const HeaderSearch = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  border-radius: 24px;
`;

const SearchInput = styled.input`
  height: 14px;
  padding: 10px;
  border: none;
  outline: none;
  width: 100%;
`;

const Icon = styled(SearchIcon)`
  padding: 5px;
  height: 22px;
  background-color: #cd9042;
`;

const HeaderNav = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const HeaderOption = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-left: 10px;
  margin-right: 10px;
  color: white;
`;

const HeaderOptionLineOne = styled.span`
  font-size: 10px;
`;

const HeaderOptionLineTwo = styled.span`
  font-size: 13px;
  font-weight: 800;
`;

const HeaderOptionBasket = styled.div`
  display: flex;
  align-items: center;
  color: white;

  .header__basketCount {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 16px;
  }
`;
