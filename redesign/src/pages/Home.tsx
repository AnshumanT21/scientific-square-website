import Page from '../components/Page';
import CTA from '../components/CTA';
import Hero from '../sections/home/Hero';
import WhyUs from '../sections/home/WhyUs';
import Disciplines from '../sections/home/Disciplines';
import Featured from '../sections/home/Featured';
import Partners from '../sections/home/Partners';
import Industries from '../sections/home/Industries';

export default function Home() {
  return (
    <Page>
      <Hero />
      <WhyUs />
      <Disciplines />
      <Featured />
      <Partners />
      <Industries />
      <CTA />
    </Page>
  );
}
