import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Dialogs from './components/Dialogs';
import FirebaseManager from './components/FirebaseManager';
import Header from './components/header';
import PrivateRoute from './components/PrivateRoute';
import Toast from './components/Toast';
import UserInteractionDetection from './components/UserInteractionDetection';
import { muiTheme } from './mui/theme';
import GamePage from './pages/game';
import LevelCreatorPage from './pages/level-creator';
import LevelSelectorPage from './pages/level-selector';
import PasswordRecovery from './pages/password-recovery/index';
import ResetPassword from './pages/reset-password';

const queryClient = new QueryClient();

const App = () => {
	return (
		<>
			<RecoilRoot>
				<ThemeProvider theme={muiTheme}>
					<CssBaseline />
					<BrowserRouter>
						<QueryClientProvider client={queryClient}>
							<FirebaseManager />
							<Dialogs />
							<UserInteractionDetection></UserInteractionDetection>
							<Header />

							<div className="flex flex-col p-[16px] md:p-[12px] grow overflow-hidden">
								<Routes>
									<Route path="/" element={<LevelSelectorPage />}></Route>
									<Route path="/level/:levelId" element={<GamePage />}></Route>
									<Route
										path="/level-creator"
										element={
											<PrivateRoute allowAnonymousUsers={false} allowLoggedUsers={true}>
												<LevelCreatorPage />{' '}
											</PrivateRoute>
										}
									></Route>
									<Route
										path="/recover-password"
										element={
											<PrivateRoute allowAnonymousUsers={true} allowLoggedUsers={false}>
												<PasswordRecovery />
											</PrivateRoute>
										}
									></Route>
									<Route
										path="/reset-password"
										element={
											<PrivateRoute allowAnonymousUsers={true} allowLoggedUsers={false}>
												<ResetPassword />
											</PrivateRoute>
										}
									></Route>
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
