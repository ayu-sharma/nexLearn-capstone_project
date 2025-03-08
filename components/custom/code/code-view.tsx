import SolvedGrid from './solved-grid';
import DSAList from './dsa-list';

const CodePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <SolvedGrid />
        </div>
        <div className="col-span-1">
          <DSAList />
        </div>
      </div>
    </div>
  );
};

export default CodePage;