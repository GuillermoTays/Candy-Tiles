import { ThemeProvider } from '@emotion/react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import FirebaseManager from './components/FirebaseManager';
import Header from './components/header';
import ManageUserDialog from './components/manage-user-dialog';
import Toast from './components/Toast';
import UserAuthDialog from './components/UserAuthDialog';
import UserInteractionDetection from './components/UserInteractionDetection';
import { muiTheme } from './mui/theme';
import GamePage from './pages/game';
import LevelCreatorPage from './pages/level-creator';
import LevelSelectorPage from './pages/level-selector';

const queryClient = new QueryClient();

const App = () => {
	return (
		<>
			<RecoilRoot>
				<ThemeProvider theme={muiTheme}>
					<BrowserRouter>
						<QueryClientProvider client={queryClient}>
							<FirebaseManager />
							<UserInteractionDetection></UserInteractionDetection>
							<Header />
							<UserAuthDialog />
							<ManageUserDialog />
							<div className="flex flex-col p-[16px] md:p-[12px] grow overflow-hidden">
								<Routes>
									<Route path="/" element={<LevelSelectorPage></LevelSelectorPage>}></Route>
									<Route path="/level/:levelId" element={<GamePage></GamePage>}></Route>
									<Route path="/level-creator" element={<LevelCreatorPage></LevelCreatorPage>}></Route>
								</Routes>
							</div>
						</QueryClientProvider>
					</BrowserRouter>
					<Toast></Toast>
				</ThemeProvider>
			</RecoilRoot>
		</>
	);
};

export default App;
