import {
  Center,
  Container,
  Flex,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';
import Carousel from './Carousel';
import Nav from './Nav';

function App() {
  const [gotImg, setgotImg] = useState(false);
  const [query, setQuery] = useState('');
  const [provider, setProvider] = useState('google');
  const [page, setPage] = useState('100');
  const [data, setData] = useState([]);

  async function duckduckgo(e) {
    if (e.key === 'Enter') {
      fetch(`https://duckduckgo.com/?q=${query}&iar=images`)
        .then((r) => r.text())
        .then((data) => {
          let vqd = data.split(';').find((e) => e.includes('vqd='));
          vqd = vqd.split("'").join('');
          console.log(vqd);
          fetch(
            `https://duckduckgo.com/i.js?q=${query}&o=json&p=1&s=${page}&u=${provider}&` +
              vqd
          )
            .then((r) => r.json())
            .then((data) => {
              console.log(data);
              setData(data.results);
              setgotImg((prev) => !prev);
            });
        });
    }
  }

  return (
    <>
      {!gotImg ? (
        <Container mt={'45vh'} w={'100vw'}>
          <Stack padding={'0 0 40px 0'} textAlign={'center'}>
            <Heading>
              Search Image <br />
            </Heading>
          </Stack>
          <Stack>
            <Input
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onKeyDown={duckduckgo}
              width={'100%'}
            />
          </Stack>
        </Container>
      ) : (
        <>
          {/* <Nav setQuery={setQuery} duckduckgo={duckduckgo} /> */}
          <Carousel data={data} />
        </>
      )}
    </>
  );
}

export default App;
