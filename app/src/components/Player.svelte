<script>
  import { Player, Boot, Poster, FileProvider } from "@vime-js/complete"
</script>

<Player
  src="/video.mp4"
  poster="/img/EMT, Youtube Banner-01.jpg"
  plugins={[Boot]}
  providers={[FileProvider]} />
