package com.fridgetoplate.interfaces;

import lombok.Data;

@Data
public class YoubuteItem {
    public String kind;
    public String etag;
    public YoutubeId id;
    public YoutubeSnippet snippet;
}
