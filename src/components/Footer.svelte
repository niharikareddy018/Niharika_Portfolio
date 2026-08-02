<footer>
  <div class="footer-content">
    <div class="copyright">&copy; {new Date().getFullYear()} Muduru Niharika. All rights reserved.</div>
  </div>
</footer>

<style>
  footer {
    width: 100%;
    background: var(--footer-bg, rgba(0, 0, 0, 0.7));
    backdrop-filter: blur(8px);
    margin-top: auto;
    position: relative;
    border-top: 1px solid var(--footer-border, rgba(255, 255, 255, 0.04));
  }

  :global(body.theme-light) footer {
    --footer-bg: rgba(240, 249, 255, 0.9);
    --footer-border: rgba(2, 132, 199, 0.08);
  }

  .footer-content {
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 28px 24px;
  }

  .copyright {
    color: var(--footer-text, rgba(255, 255, 255, 0.55));
    font-size: 0.92rem;
    font-weight: 400;
    font-family: "Inter", "SF Pro Display", system-ui, -apple-system, sans-serif;
    text-align: center;
    letter-spacing: 0.01em;
  }

  :global(body.theme-light) .copyright {
    --footer-text: rgba(51, 65, 85, 0.85);
  }

  @media (max-width: 768px) {
    .footer-content {
      padding: 22px 20px;
    }

    .copyright {
      font-size: 0.85rem;
    }
  }
</style>
