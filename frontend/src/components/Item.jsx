function Item(props) {
  const { imgUrl, name, description, price } = props;

  const handleClick = () => {
    alert(`Item ${name} diklik`);
  };

  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={imgUrl ?? "https://via.placeholder.com/300"} alt="Placeholder" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{name}</p>
            <p className="subtitle is-6">{description}</p>
          </div>
        </div>
      </div>
      <footer className="card-footer">
        <span onClick={handleClick} className="card-footer-item">
          Detail
        </span>
      </footer>
    </div>
  );
}

export default Item;