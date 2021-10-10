import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

const exampleTabs = ['Experience', 'Projects', 'Education']

const exampleTabContent = [{"section": "TradeLot, Architect Jul '19 - Current",
"content": "Worked as intermediate with clients and built team to maximize investment in $10M upgrade project."
}, 
{"section": "Cloud Clearwater",
"content" : "Created 20 different commercial designs around innovative integration of traditional buildings and environmentally sustainable redevelopments"
},
{"section": "Coral Springs University Mar '11 - Dec '15",
"content" : "Architecture/Engineering"
}
]

function SectorPreview(){
    const [selectedTab, setSelectedTab] = React.useState(0);
    
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                {...other}
            >
                {value === index && <Box>{children}</Box>}
            </div>
        );
    }
    
    return (
        <div>
            <Tabs TabIndicatorProps={{style: {background:'#5F9EA0'}}} value={selectedTab} onChange={handleChange}>
                {exampleTabs.map((tab, i) => {
                return (
                <Tab label={tab} index={i}/>
                )
            })}
            </Tabs>


            {exampleTabContent.map((tabContent, i) => {
                return (
                <TabPanel value={selectedTab} index={i}>
                    <div>
                        <h1>{tabContent.section}</h1>
                    </div>
                    <div>
                        {tabContent.content}
                    </div>
                </TabPanel>
                )
            })}
        </div>
    )
}

export default SectorPreview;