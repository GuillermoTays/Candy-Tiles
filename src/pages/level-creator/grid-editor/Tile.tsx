import anime from 'animejs';
import useAudio from '../../../hooks/useAudio';
import useEffectAfterMount from '../../../hooks/useEffectAfterMount';
import { randomNumber } from '../../../utils/math';

const animateTileSpawn = (index: number) => {
	anime({
		targets: `[data-tile][data-index="${index}"]>img`,
		translateY: ['-50%', 0],
		scale: [2, 1],
		duration: 350,
		easing: 'easeOutExpo',
	});
};

type Props = {
	index: number;
	tileObj: LevelEditorElement | null;
	slotAvaliable: boolean;
};

const Tile = ({ index, tileObj, slotAvaliable }: Props) => {
	const playAudio = useAudio();

	useEffectAfterMount(() => {
		!!tileObj && onSpawn();
	}, [tileObj]);

	const onSpawn = () => {
		animateTileSpawn(index);
		playAudio({ audioName: 'put1', speed: randomNumber(0.8, 1), volume: 0.5 });
	};

	return (
		<div
			data-tile
			data-index={index}
			className="select-none hover:border-[5px] hover:border-s-main/50 hover:bg-s-main/10 box-border "
			style={{
				pointerEvents: slotAvaliable ? 'inherit' : 'none',
			}}
		>
			{tileObj ? <img src={tileObj.spriteSrc} className="pointer-events-none"></img> : <></>}
		</div>
	);
};

export default Tile;
