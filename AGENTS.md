<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project decisions

- Keep all public-facing clinic and professional content in `src/config/site.ts` so provisional data can be replaced safely.
- Serve professional details through the shared `/profissionais/$slug` route so every profile keeps one consistent page structure.
- Keep essential displayed images as standard imported files in `src/assets` so GitHub ZIP downloads remain self-contained.
