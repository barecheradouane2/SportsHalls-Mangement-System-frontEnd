
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

function TabsContent({tabs,tabscontent}) {

  return (
    <Tabs className={"p-4"}>
        <TabList>
          {
            tabs && tabs.map((tab, index) => (
              <Tab key={index}>{tab}</Tab>
            ))
          }
       
        </TabList>

        {
          tabscontent && tabscontent.map((content, index) => (
            <TabPanel key={index} className={"p-4"}>
              {content}
            </TabPanel>
          ))
        }

        
      </Tabs>
  
  );
}

export default TabsContent;
