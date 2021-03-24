import { Button } from "./Button";
import '../styles/sidebar.scss';
import { useCategory } from "../hooks/useCategory";

export function SideBar() {
  const { genres, handleClickButton, selectedGenreId } = useCategory();
  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}