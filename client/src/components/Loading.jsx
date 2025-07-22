function Loading({ height }) {
  return (
    <div className={`${height} p-20 place-items-center`}>
      <img className="h-20" src={"./images/loading.svg"} alt="" />
    </div>
  );
}

export default Loading;
