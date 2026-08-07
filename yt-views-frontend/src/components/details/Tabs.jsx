const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-full border-b border-border flex items-center mb-6">
      <button
        onClick={() => onTabChange('today')}
        className={`pb-3 px-1 text-[15px] font-medium mr-8 relative transition-colors ${
          activeTab === 'today'
            ? 'text-blue-600'
            : 'text-secondary hover:text-primary'
        }`}
      >
        Today
        {activeTab === 'today' && (
          <span className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
        )}
      </button>

      <button
        onClick={() => onTabChange('yesterday')}
        className={`pb-3 px-1 text-[15px] font-medium relative transition-colors ${
          activeTab === 'yesterday'
            ? 'text-blue-600'
            : 'text-secondary hover:text-primary'
        }`}
      >
        Yesterday
        {activeTab === 'yesterday' && (
          <span className="absolute bottom-[-1px] left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
        )}
      </button>
    </div>
  );
};

export default Tabs;
