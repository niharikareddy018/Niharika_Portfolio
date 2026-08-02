<script>
  import { onMount } from "svelte";
  import Navbar from "./components/Navbar.svelte";
  import Hero from "./components/Hero.svelte";
  import About from "./components/About.svelte";
  import ScrollIndicator from "./components/ScrollIndicator.svelte";
  import Experience from "./components/Experience.svelte";
  import Skills from "./components/Skills.svelte";
  import Writing from "./components/Writing.svelte";
  import Work from "./components/Work.svelte";
  import Contact from "./components/Contact.svelte";
  import WorkFullPage from "./pages/WorkFullPage.svelte";
  import ProjectDetailPage from "./pages/ProjectDetailPage.svelte";
  import BoardPage from "./pages/BoardPage.svelte";
  import Loading from "./components/Loading.svelte";
  import Footer from "./components/Footer.svelte";
  import FloatingActions from "./components/FloatingActions.svelte";
  import "./styles/global.css";
  import "./app.css";

  let showScrollIndicator = true;
  let isLoading = true;
  let currentPath = window.location.pathname;

  function handleLoadingComplete() {
    isLoading = false;
  }

  function handleNavigation() {
    currentPath = window.location.pathname;
    window.scrollTo(0, 0);
  }

  onMount(() => {
    function handleScroll() {
      showScrollIndicator = window.pageYOffset < 100;
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("popstate", handleNavigation);

    function handleClick(e) {
      const a = /** @type {HTMLElement} */ (e.target).closest("a");
      if (a && a.href && a.href.startsWith(window.location.origin) && !a.hasAttribute("data-sveltekit-noscroll") && !a.hasAttribute("data-external") && !a.getAttribute("href").startsWith("#") && !a.getAttribute("href").startsWith("/api/") && !a.getAttribute("href").includes("drive.google.com")) {
        if (a.getAttribute("href").startsWith("/#") && currentPath === "/") {
            e.preventDefault();
            const id = a.getAttribute("href").substring(2);
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState({}, "", a.href);
            return;
        }

        e.preventDefault();
        window.history.pushState({}, "", a.href);
        handleNavigation();

        if (a.getAttribute("href").startsWith("/#")) {
            setTimeout(() => {
                const id = a.getAttribute("href").substring(2);
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
      }
    }

    document.body.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", handleNavigation);
      document.body.removeEventListener("click", handleClick);
    }
  });
</script>

{#if isLoading}
  <Loading onLoadingComplete={handleLoadingComplete} />
{:else}
  <div class="app-container">
    <Navbar />
    <main>
      {#if currentPath === "/"}
        <div id="home">
          <Hero />
        </div>

        {#if showScrollIndicator}
          <ScrollIndicator />
        {/if}

        <About />
        <Experience />
        <Writing />
        <Work />
        <Skills />
        <Contact />
        <FloatingActions />
      {:else if currentPath === "/work" || currentPath === "/work/"}
        <WorkFullPage />
      {:else if currentPath.startsWith("/work/")}
        <ProjectDetailPage slug={currentPath.split("/")[2]} />
      {:else if currentPath === "/board" || currentPath === "/board/"}
        <BoardPage />
      {/if}
    </main>
    <Footer />
  </div>
{/if}

<style>
  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-x: hidden;
  }

  main {
    flex: 1;
    width: 100%;
  }

  @media (max-width: 768px) {
    .app-container {
      min-height: 100vh;
    }
  }
</style>
