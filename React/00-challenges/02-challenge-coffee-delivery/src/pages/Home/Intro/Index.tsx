import {
  IntroContainer,
  IntroTitle,
  Highlights,
  BackgroundIconHighlights,
  HighlightsLeft,
  HighlightsRight,
} from './styles'
import imagemCoffee from '../../../assets/Imagem.svg'
import { Coffee, Package, ShoppingCart, Timer } from 'phosphor-react'
export function Intro() {
  return (
    <IntroContainer>
      <IntroTitle>
        <h1>
          Encontre o café perfeito <br /> para qualquer hora do dia
        </h1>
        <span>
          Com o Coffee Delivery você recebe seu café onde estiver, a <br />{' '}
          qualquer hora
        </span>
        <Highlights>
          <HighlightsLeft>
            <div>
              <BackgroundIconHighlights background_color_type="kart">
                <ShoppingCart weight="fill" size={16} />
              </BackgroundIconHighlights>
              <p>Compra Simples e segura</p>
            </div>
            <div>
              <BackgroundIconHighlights background_color_type="timer">
                <Timer weight="fill" size={16} />
              </BackgroundIconHighlights>
              <p>Entrega rápida e rastreada</p>
            </div>
          </HighlightsLeft>
          <HighlightsRight>
            <div>
              <BackgroundIconHighlights background_color_type="package">
                <Package weight="fill" size={16} />
              </BackgroundIconHighlights>
              <p>Embalagem mantém o café intacto</p>
            </div>
            <div>
              <BackgroundIconHighlights background_color_type="coffee">
                <Coffee weight="fill" size={16} />
              </BackgroundIconHighlights>
              <p>O café chega fresquinho até você</p>
            </div>
          </HighlightsRight>
        </Highlights>
      </IntroTitle>
      <img src={imagemCoffee} alt="Copo de café com logo da Coffee Delivery" />
    </IntroContainer>
  )
}
