package com.fridgetoplate.interfaces;

import lombok.Data;

@Data
public class YoutubeSnippet {
    public String publishedAt;
    public String channelId;
    public String title;
    public String description;
    public YoutubeThumbnails thumbnails;
    public String channelTitle;
    public String liveBroadcastContent;
    public String publishTime;
}
