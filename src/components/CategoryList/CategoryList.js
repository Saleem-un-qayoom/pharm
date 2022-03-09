const category = [
  {
    name: "Medicine (879)",
    image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
  },
  {
    name: "Personal (18)",
    image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
  },
  {
    name: "Ayurvedic (59)",
    image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
  },
  {
    name: "Surgical (28)",
    image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
  },
  {
    name: "Cosmetics (8)",
    image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
  },
  {
    name: "Covid Essentials (0)",
    image: "https://img.icons8.com/fluency/48/000000/whatsapp.png",
  },
];

function CategoryList({ history, showHeader = false }) {
  return (
    <div className="shop-by-category background-tertiary ion-padding">
      <div className="shop-by-category-head flex justify-between items-center mb-2">
        <p className="text-xs font-medium	text-color-primary">
          Shop by Category
        </p>
        {showHeader && (
          <>
            <button
              className="text-xs font-medium"
              onClick={() => history.push("/categories-page")}
            >
              View all
            </button>
          </>
        )}
      </div>

      <div>
        <ul className="flex justify-between flex-wrap items-center ">
          {category.map((item) => {
            return (
              <div
                className="flex flex-col items-center bg-white mb-2 p-1 rounded-xl	"
                style={{ width: "31%" }}
              >
                <img src={item.image} className="w-12" />
                <li className="text-slate-700 mt-2 font10 font-w-700">
                  {item.name}
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default CategoryList;
