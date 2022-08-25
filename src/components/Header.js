import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
const menuTitle = [
  "구구단",
  // "끝말잇기",
  // "숫자야구",
  // "반응속도체크",
  "가위바위보",
  // "로또",
  // "틱택토",
  // "지뢰찾기",
];
const Menu = styled.div`
  display: flex;
  justify-content: center;
  color: ${(props) => (props.isPath ? "red" : "")};
  width: ${100 / menuTitle.length}%;
  font-weight: ${(props) => (props.isPath ? "bold" : "")};

  :hover {
    cursor: pointer;
  }
`;
export default function Header() {
  const navigate = useNavigate();
  let { pathname } = useLocation();
  if (pathname === "/") pathname = "/0";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        borderBottom: "2px solid gray",
        zIndex: 17,
      }}
    >
      <nav>
        <h2>Web Game</h2>
      </nav>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          height: "40px",
          // backgroundColor: "#818181",
          fontSize: "18px",
        }}
      >
        {menuTitle.map((el, index) => (
          <Menu
            onClick={() => {
              index > 0 ? navigate(`/${index}`) : navigate("/");
            }}
            isPath={pathname === "/" + String(index)}
          >
            {el}
          </Menu>
        ))}
      </nav>
    </div>
  );
}
