import SolvedGrid from './solved-grid';
import DSAList from './dsa-list';

const CodePage = () => {

  return (
    <div className='grid grid-cols-3 gap-x-6'>
      <SolvedGrid />
      <DSAList />
    </div>
  );
};

export default CodePage;
