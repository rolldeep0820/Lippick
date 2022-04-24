import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./HistoryPage.scss";
import { AiOutlineEye, AiOutlineCloseCircle } from "react-icons/ai";

function HistoryPage(props) {
  useEffect(() => {
    props.dispatch({ type: "nav-on" });
  }, [props.navTG]);

  const linkStyle = {
    color: "inherit",
    textDecoration: "none",
    flex: "1",
  };
  console.log(props.user);

  return (
    <div className="history-top-wrap">
      <div className="history-wrap">
        <div className="history-card-title">
          <h3>나의 주문내역</h3>
        </div>
        <div className="history-card-top-wrap">
          {props.user.userData &&
            props.user.userData.history.map((item) => {
              return (
                <div className="history-card-wrap">
                  <div className="history-card-left">
                    <img src={123} alt="이미지 삽입" />
                  </div>

                  <div className="history-card-right">
                    <div className="history-card-right-top">
                      <h3>{item.name}</h3>
                    </div>
                    <div className="history-card-right-mid">
                      <div className="history-card-right-mid-top">
                        <span> {item.quantity} EA</span>
                      </div>
                      <div className="history-card-right-mid-bottom">
                        <div>
                          <span>주문번호 : {item.dataOfPurchase}</span>
                        </div>
                        <div>
                          <span> {item.price} 원</span>
                        </div>
                      </div>
                    </div>
                    <div className="history-card-right-bottom">
                      <Link to={`/product/${item.id}`} style={linkStyle}>
                        <div>
                          <span>
                            <AiOutlineEye /> 주문 제품 상세보기
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

function stateprops(state) {
  return {
    navTG: state.reducer1,
  };
}
export default connect(stateprops)(HistoryPage);
