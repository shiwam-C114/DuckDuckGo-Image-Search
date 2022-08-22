import {
  Center,
  Container,
  Flex,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Carousel from './Carousel';
import Nav from './Nav';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

function App() {
  const [gotImg, setgotImg] = useState(false);
  const [query, setQuery] = useState('');
  const [provider, setProvider] = useState('google');
  const [page, setPage] = useState('100');
  const [data, setData] = useState([]);
  useEffect(() => {
    duckduckgo();
  }, [page, provider]);

  async function duckduckgo(e = 'Enter') {
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
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList>
              <Tab
                onClick={(e) => {
                  console.dir(e.target.innerText);
                  setProvider(e.target.innerText)
                }}
              >
                bing
              </Tab>
              <Tab
                onClick={(e) => {
                  console.dir(e.target.innerText);
                  setProvider(e.target.innerText)
                }}
              >
                google
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Carousel data={data} />
              </TabPanel>
              <TabPanel>
                <Carousel data={data} />
              </TabPanel>
            </TabPanels>
          </Tabs>
          {/* <Nav setQuery={setQuery} duckduckgo={duckduckgo} /> */}
        </>
      )}
    </>
  );
}

export default App;
