import { HeroList } from '../components';

export const MarvelPage = () => {
    return (
        <>
            <h1>Marvel comics</h1>
            <hr />

            <HeroList publisher='Marvel Comics' />
        </>
    );
};