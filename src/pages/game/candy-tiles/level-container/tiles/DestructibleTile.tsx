import { forwardRef, useState } from 'react';
import useEffectAfterMount from '../../../../../hooks/useEffectAfterMount';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { matchListState } from '../../store/matchList';
import { levelTilesState } from '../../store/levelTiles';
import useAudio from '../../../../../hooks/useAudio';
import useScore from '../../hooks/useScore';

type Props = {
	tileType: string;
	index: number;
	spriteSrc: string;
	crackSoundName: GameSFX;
	damagedCrackSoundName: GameSFX;
	matched: boolean;
	onDestructed?: () => void;
	className?: string;
};

const DestructibleTile = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
	const [damaged, setDamaged] = useState(false);
	const matchList = useRecoilValue(matchListState);
	const setLevelTiles = useSetRecoilState(levelTilesState);
	const playAudio = useAudio();

	useScore(props.matched && damaged, props.index, props.tileType);

	useEffectAfterMount(() => {
		checkMatchInTile();
	}, [matchList]);

	const checkMatchInTile = () => {
		if (!props.matched) return;

		if (!damaged) {
			playAudio({ audioName: props.crackSoundName });
			setDamaged(true);
			return;
		}

		playAudio({ audioName: props.damagedCrackSoundName });

		setLevelTiles((tiles) => {
			const newTiles = structuredClone(tiles);
			newTiles[props.index] = { type: 'Normal' };
			return newTiles;
		});

		props.onDestructed?.();
	};

	return (
		<div className={`relative bg-black/25 m-[2%] hover:invert duration-200 select-none rounded ${props.className}`} data-index={props.index} ref={ref}>
			<img
				src={props.spriteSrc}
				className="pointer-events-none"
				style={{
					opacity: damaged ? 0.6 : 1,
				}}
			></img>
			<span className="absolute bottom-0 right-0 text-[12px] text-white/80 font-bold">{props.index}</span>
		</div>
	);
});

export default DestructibleTile;
