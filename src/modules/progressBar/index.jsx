const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 6,
  };

  const fillerStyles = {
    width: `${completed}%`,
    backgroundColor: bgcolor,
  };

  return (
    <div style={containerStyles} className="w-[220px] mb-5 bg-[#25282e]">
      <div style={fillerStyles} className="relative h-full transition-all">
      </div>
    </div>
  )
};

export default ProgressBar;
