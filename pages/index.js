import { useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import styles from "../styles/Home.module.css";

export default function Home({ products }) {
  const [showFilter, setShowFilter] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showSort, setShowSort] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortOption, setSortOption] = useState("Recommended");

  const pageTitle = "Discover our products | Appscrip task demo";
  const pageDescription =
    "A sample product listing page built with Next.js demonstrating SSR, responsive layout, SEO and minimal dependencies.";

  const toggleFilter = () => setShowFilter(!showFilter);
  const toggleSort = () => setShowSort(!showSort);

  const toggleDropdown = (section) => {
    setOpenDropdown(openDropdown === section ? null : section);
  };

  const handleFilterChange = (value) => {
    setSelectedFilters((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    setShowSort(false);
  };

  const filterOptions = {
    "Customizable": [],
    "Ideal For": ["Men", "Women", "Baby & Kids"],
    "Occasion": ["Casual", "Formal", "Party"],
    "Work": ["Office", "Outdoor", "Travel"],
    "Fabric": ["Cotton", "Silk", "Denim"],
    "Segment": ["Premium", "Budget", "Luxury"],
    "Suitable For": ["Daily Use", "Wedding", "Sports"],
    "Raw Materials": ["Organic Cotton", "Recycled", "Synthetic"],
    "Pattern": ["Solid", "Printed", "Striped"],
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Product listing - Appscrip task demo",
    description: pageDescription,
    itemListElement: products.slice(0, 20).map((p, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      url: `https://example.com/product/${p.id}`,
      name: p.title,
    })),
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <Header />

      <main className="container">
        <section className={styles.pageHeader}>
          <h1 className="heroTitle">DISCOVER OUR PRODUCTS</h1>
        </section>

        <div className={styles.layout}>
          {/* --- FILTER SIDEBAR --- */}
          {showFilter && (
            <aside className={`${styles.sidebar} ${styles.filterBox}`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <strong>3425 ITEMS</strong>
                <button
                  onClick={toggleFilter}
                  style={{
                    border: "none",
                    background: "none",
                    color: "#888",
                    cursor: "pointer",
                  }}
                >
                  Hide Filter
                </button>
              </div>

              {/* FILTER SECTIONS */}
              <div style={{ marginTop: 20 }}>
                {Object.entries(filterOptions).map(([title, options]) => (
                  <div key={title} style={{ marginBottom: 15 }}>
                    <div
                      onClick={() => toggleDropdown(title)}
                      style={{
                        cursor: "pointer",
                        fontWeight: "600",
                        marginBottom: 6,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>{title}</span>
                      <span>{openDropdown === title ? "▴" : "▾"}</span>
                    </div>
                    {openDropdown === title && (
                      <div style={{ marginLeft: 10 }}>
                        {options.length > 0 ? (
                          options.map((opt) => (
                            <div key={opt}>
                              <label>
                                <input
                                  type="checkbox"
                                  checked={selectedFilters.includes(opt)}
                                  onChange={() => handleFilterChange(opt)}
                                />{" "}
                                {opt}
                              </label>
                            </div>
                          ))
                        ) : (
                          <span style={{ color: "#777", fontSize: "0.9em" }}>
                            All
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </aside>
          )}

          {!showFilter && (
            <div style={{ marginBottom: 12 }}>
              <button
                onClick={toggleFilter}
                style={{
                  border: "1px solid #ccc",
                  background: "none",
                  padding: "4px 8px",
                  cursor: "pointer",
                }}
              >
                Show Filter
              </button>
            </div>
          )}

          {/* --- PRODUCT GRID + SORT --- */}
          <div className={styles.gridWrap}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
                position: "relative",
              }}
            >
              <div>3425 ITEMS</div>
              <div style={{ position: "relative" }}>
                <button
                  onClick={toggleSort}
                  style={{
                    border: "none",
                    background: "none",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  {sortOption} ▾
                </button>
                {showSort && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      background: "#fff",
                      border: "1px solid #ccc",
                      padding: "8px",
                      zIndex: 5,
                    }}
                  >
                    {[
                      "Newest First",
                      "Popular",
                      "Price: High to Low",
                      "Price: Low to High",
                    ].map((opt) => (
                      <div key={opt}>
                        <label
                          style={{ cursor: "pointer" }}
                          onClick={() => handleSortChange(opt)}
                        >
                          {opt}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <section className={styles.productsGrid} aria-label="Product grid">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();
    return { props: { products } };
  } catch (err) {
    console.error(err);
    return { props: { products: [] } };
  }
}
