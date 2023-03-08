import { Container, Paper, Stack, Tab, Tabs } from '@mui/material';
import anime from 'animejs';
import { useEffect } from 'react';
import TabPanel from '../../mui/components/TabPanel';
import { useRecoilState, useRecoilValue } from 'recoil';
import { completedLevelsState } from '../../store/completedLevels';
import Header from '../../components/header';
import MainLevelsTab from './main-levels-tab';
import OnlineLevelsTab from './online-levels-tab';
import { grey } from '@mui/material/colors';
import { selectedTabState } from './store/selectedTab';

const animateButtons = () => {
	anime({
		targets: '[data-level-button]',
		scale: [0, 1],
		delay: anime.stagger(4),
		duration: 500,
		easing: 'easeOutCirc',
	});
};

const LevelSelectorPage = () => {
	const [selectedTab, setSelectedTab] = useRecoilState(selectedTabState);
	const completedLevels = useRecoilValue(completedLevelsState);

	useEffect(() => {
		selectedTab === 0 && animateButtons();
	}, [selectedTab]);

	const onTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setSelectedTab(newValue);
	};

	return (
		<>
			<Header />
			<Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
				<Stack component={Paper} overflow="hidden" sx={{ backgroundColor: grey[100] }}>
					<Tabs
						value={selectedTab}
						onChange={onTabChange}
						centered
						variant="fullWidth"
						sx={{ minHeight: '64px' }}
						className="px-[16px] py-[8px] sticky top-0 left-0"
						textColor="primary"
						indicatorColor="primary"
					>
						<Tab label="Main Levels"></Tab>
						<Tab label="Online levels"></Tab>
						<Tab label="My levels"></Tab>
					</Tabs>
					<TabPanel className="overflow-auto" index={0} value={selectedTab}>
						<MainLevelsTab completedLevels={completedLevels} />
					</TabPanel>

					<TabPanel className="overflow-hidden" index={1} value={selectedTab}>
						<OnlineLevelsTab />
					</TabPanel>
				</Stack>
			</Container>
		</>
	);
};

export default LevelSelectorPage;
