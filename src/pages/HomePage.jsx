import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { useState, useEffect } from "react";
import Card from "../components/Card";

export default function Homepage() {
	const { products, handleClick, isLiked, productLiked, isProductLiked } =
		useContext(GlobalContext);
	const [searchQuery, setSearchQuery] = useState("");
	//select delle categorie
	const [selectedCategory, setSelectedCategory] = useState(
		"Seleziona una categoria"
	);
	//select dell'ordine
	const [selectedOrder, setSelectedOrder] = useState("Ordina per...");

	if (products.length === 0) {
		return <h2>Caricamento dati</h2>;
	}

	//filtraggio prodotti
	const filteredProducts = products.filter((p) => {
		const isCategoryMatch =
			selectedCategory === "Seleziona una categoria" ||
			p.category === selectedCategory;
		const isSearchMatch =
			searchQuery.trim() === "" ||
			p.title.toLowerCase().includes(searchQuery.toLowerCase());
		return isCategoryMatch && isSearchMatch;
	});

	//prodotti filtrati e ordinati secondo le varie opzioni
	const sortedProducts = filteredProducts.sort((a, b) => {
		if (
			selectedOrder === "Ordine Alfabetico A-z" ||
			selectedOrder === "Ordina per..."
		) {
			return a.title.localeCompare(b.title);
		} else if (selectedOrder === "Ordine Alfabetico Z-a") {
			return b.title.localeCompare(a.title);
		} else if (selectedOrder === "Ordine di Prezzo Crescente") {
			return a.price - b.price;
		} else if (selectedOrder === "Ordine di Prezzo Decrescente") {
			return b.price - a.price;
		}
	});

	return (
		<div className="container mt-4 mb-5">
			<h1>Confronta uno o più dispositivi tra loro</h1>
			<h3>
				Dai un'occhiata a come si confrontano le caratteristiche tra i vari
				smartphone, ti aiuteremo a scegliere il telefono perfetto per te. Vai
				alla sezione dedicata o seleziona i prodotti dalla lista.
			</h3>
			<div className="d-flex mt-3">
				<input
					className="me-2"
					type="text"
					placeholder="Cerca per nome..."
					aria-label="Search"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<select
					className="p-2"
					value={selectedCategory}
					onChange={(e) => setSelectedCategory(e.target.value)}
				>
					<option defaultValue="Seleziona una categoria">
						Seleziona una categoria
					</option>
					<option value="Smartphone">Smartphone</option>
					<option value="Tablet">Tablet</option>
					<option value="Computer">Computer</option>
				</select>
				<select
					className="p-2 ms-2"
					value={selectedOrder}
					onChange={(e) => setSelectedOrder(e.target.value)}
				>
					<option defaultValue="Ordina per...">Ordina per...</option>
					<option value="Ordine Alfabetico A-z">Ordine Alfabetico A-z</option>
					<option value="Ordine Alfabetico Z-a"> Ordine Alfabetico Z-a</option>
					<option value="Ordine di Prezzo Crescente">
						Ordine di Prezzo Crescente
					</option>
					<option value="Ordine di Prezzo Decrescente">
						Ordine di Prezzo Decrescente
					</option>
				</select>
			</div>

			{sortedProducts.length > 0 ? (
				//mostro i prodotti filtrati
				<div className="row row-cols-3 d-flex">
					{sortedProducts.map((p) => (
						<div key={p.id} className="col g-4 text-center">
							<Card prop={p} />
						</div>
					))}
				</div>
			) : (
				//altrimenti mostro un messaggio di errore
				<div className="container mt-4">
					<h2>Nessun risultato trovato!</h2>
					<h3>Prova a cercare un altro prodotto o cambia categoria</h3>
				</div>
			)}
		</div>
	);
}
