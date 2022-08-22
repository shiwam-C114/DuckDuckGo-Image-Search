import {
  Button,
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
  const [gdata, setgData] = useState([]);
  const [bdata, setbData] = useState([]);
  useEffect(() => {
    duckduckgo();
  }, [page, provider]);

  async function duckduckgo() {
    fetch(`https://duckduckgo.com/?q=${query}&iar=images`)
      .then((r) => r.text())
      .then((data) => {
        let vqd = data.split(';').find((e) => e.includes('vqd='));
        vqd = vqd.split("'").join('');
        console.log(vqd);
        fetch(
          `https://duckduckgo.com/i.js?q=${query}&o=json&p=1&s=${page}&u=google&` +
            vqd
        )
          .then((r) => r.json())
          .then((data) => {
            console.log(data);
            setgData(data.results);
            setgotImg(true);
          });
        fetch(
          `https://duckduckgo.com/i.js?q=${query}&o=json&p=1&s=${page}&u=bing&` +
            vqd
        )
          .then((r) => r.json())
          .then((data) => {
            console.log(data);
            setbData(data.results);
          });
      });
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
              width={'100%'}
            />
            <Button onClick={duckduckgo} colorScheme={'facebook'}>
              search
            </Button>
          </Stack>
        </Container>
      ) : (
        <>
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList>
              <Tab>bing</Tab>
              <Tab>google</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Carousel data={bdata} />
              </TabPanel>
              <TabPanel>
                <Carousel data={gdata} />
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
