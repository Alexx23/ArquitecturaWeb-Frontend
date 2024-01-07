if (
  localStorage.getItem("dark-theme") == "true" ||
  (!("dark-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
  localStorage.setItem("dark-theme", "true");
} else {
  document.documentElement.classList.remove("dark");
  localStorage.setItem("dark-theme", "false");
}
export {};
