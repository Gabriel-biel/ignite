import styled from 'styled-components'

export const IntroContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 5.875rem 0;

  gap: 3.5rem;
`
export const IntroTitle = styled.div`
  h1 {
    font-family: 'Baloo 2', 'Roboto';
    font-size: 3rem;
    font-weight: 800;
    color: ${(props) => props.theme['base-Title']};
    line-height: 130%;
    margin-bottom: 1rem;
  }

  span {
    color: ${(props) => props.theme['base-SubTitle']};
    font-size: 1.25rem;
    line-height: 130%;
  }
`
export const Highlights = styled.div`
  display: flex;
  width: 100%;

  margin-top: 4.125rem;
  gap: 2.5rem;

  div {
    display: flex;
    align-items: center;
  }
  svg {
    color: white;
  }
`

const HighlightsLeftAndRightBase = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;

  div {
    gap: 0.75rem;
  }
`
export const HighlightsLeft = styled(HighlightsLeftAndRightBase)``
export const HighlightsRight = styled(HighlightsLeftAndRightBase)``

const HighlightsColor = {
  kart: 'yellow-800',
  package: 'base-Text',
  timer: 'yellow-500',
  coffee: 'purple-500',
} as const

interface HighLights_Props {
  background_color_type: keyof typeof HighlightsColor
}

export const BackgroundIconHighlights = styled.div<HighLights_Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;

  color: ${(props) => props.theme.white};
  background: ${(props) =>
    props.theme[HighlightsColor[props.background_color_type]]};
`
