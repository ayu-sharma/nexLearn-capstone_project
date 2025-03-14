import SolvedGrid from './solved-grid';
import DSAList from './dsa-list';

const CodePage = () => {
  return (
    <div className="container mx-auto px-4 flex flex-col overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow overflow-hidden">
        <div className="col-span-1 lg:col-span-2 overflow-auto">
          <SolvedGrid />
        </div>
        <div className="col-span-1 overflow-auto">
          <DSAList />
        </div>
      </div>
    </div>
  );
};

export default CodePage;