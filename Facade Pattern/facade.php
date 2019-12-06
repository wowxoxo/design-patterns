<?php
namespace RefactoringGuru\Facade\RealWorld;

class YoutubeDownloader
{
  protected $youtube;
  protected $ffmpeg;

  public function __construct(string $youtubeApiKey)
  {
    $this->youtube = new Youtube($youtubeApiKey);
    $this->ffmpeg = new FFMpeg;
  }

  public function downloadVideo(string $url): void
  {
    echo "Fetching video metadata from youtube...\n";
    // $title = $this->youtube->fetchVideo($url)->getTitle();
    echo "Saving video to a temporary file...\n";
    // $this->youtube->saveAs($url, "video.mpg");

    echo "Processing source video...\n";
    // $video = $this->ffmpeg->open("video.mpg");
    echo "Normalizing and reszing the video to smaller dimensions...\n";
    // $video
    //   ->filters()
    //   ->resize(new FFMpeg\Coordinate\Dimension(320, 240)))
    //   ->synchronize();
    echo "Capturing preview image...\n";
    // $video
    //   ->frame(FFMpeg\Coordinate\TimeCode::fromSeconds(10))
    //   ->save($title . 'frame.jpg');
    echo 'Saving video in target formats...\n';
    $video
      ->save(new FFMpeg\Format\Video\x264, $title . ".mp4")
      ->save(new FFMpeg\Format\Video\MWV, $title . ".mwv")
      ->save(new FFMpeg\Format\Video\WebM, $title . ".webm");
    echo "Done\n";
  }
}

class Youtube
{
  public function fetchVideo(): string {  }
  public function saveAs(string $path): void {  }
}

class FFMpeg
{
  public static function create(): FFMpeg {  }
  public function open(string $video): void {  }
}

class FFMpegVideo
{
  public function filters(): self {  }

  public function resize(): self {  }

  public function synchronize(): self {  }

  public function frame(): self {  } 

  public function save(string $path): self {  }
}

function clientCode(YouTubeDownloader $facade)
{
  $facade->downloadVideo("https://www.youtube.com/watch?v=QH2-TGUlwu4");
}

$facade = new YouTubeDownloader("APIKEY-XXXXXXX");
clientCode($facade);
?>