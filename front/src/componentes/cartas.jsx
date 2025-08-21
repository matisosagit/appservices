import './carta.scss';
import { Printer} from "phosphor-react";
import {UserList} from "phosphor-react";
import {CheckSquareOffset} from "phosphor-react";
import {Wrench} from "phosphor-react";

const cardData = [
  { title: "Rápido registro de clientes", icon: <UserList size={32}/> },
  { title: "Gestión eficiente de reparaciones", icon: <Wrench size={32}/> },
  { title: "Panel de control intuitivo", icon: <CheckSquareOffset size={32}/> },
  { title: "Boletas automáticos", icon: <Printer size={32}/> },
];

const CardsGrid = () => {
  return (
    <div className="container">
      {cardData.map(({ title, icon }, index) => (
        <div key={index} className="card" style={{ "--cards": index  }}>
          {Array.from({ length: index + 1 }).map((_, index ) => (
            <div key={index} className="child">
              {index === 0 && (
                <>
                  {icon}
                  <h2>{title}</h2>
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CardsGrid;
