package com.fridgetoplate.interfaces;

import lombok.Data;

@Data
public class YoutubeVideosResponse {
    public String kind;
    public String etag;
    public String nextPageToken;
    public String regionCode;
    public YoutubePageInfo pageInfo;
    public YoubuteItem[] items;
}
