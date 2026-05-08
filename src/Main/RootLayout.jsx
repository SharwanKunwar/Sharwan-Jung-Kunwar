
import { Container } from '../components/Container'
import { ShootingStarsAndStarsBackgroundDemo } from '../components/ui/ShootingStarsAndStarsBackgroundDemo'


function RootLayout() {

  return (
    <>
      <Container className="no-scrollbar relative">
        <ShootingStarsAndStarsBackgroundDemo />
      </Container>
    </>
  )
}

export default RootLayout
