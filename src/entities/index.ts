/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: ottcontent
 * Interface for OTTContent
 */
export interface OTTContent {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType boolean */
  isTopGrossing?: boolean;
  /** @wixFieldType number */
  rottenTomatoesRating?: number;
  /** @wixFieldType number */
  imdbRating?: number;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  genre?: string;
  /** @wixFieldType text */
  contentType?: string;
  /** @wixFieldType text */
  streamingPlatform?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  posterImage?: string;
}


/**
 * Collection ID: ottplatforms
 * Interface for OTTPlatforms
 */
export interface OTTPlatforms {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  platformName?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  platformLogo?: string;
  /** @wixFieldType text */
  subscriptionDetails?: string;
  /** @wixFieldType url */
  websiteLink?: string;
  /** @wixFieldType text */
  description?: string;
}
