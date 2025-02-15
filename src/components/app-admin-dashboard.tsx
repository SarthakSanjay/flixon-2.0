"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface Content {
  name: string;
  description: string;
  images: {
    thumbnail: string;
    poster: string;
    screenshots: string[];
  };
  genre: string[];
  duration: number;
  language: string[];
  director: string;
  trailerUrl: string;
  isFeatured: boolean;
  ageRating: string;
  audioLanguage: string[];
  subtitles: string[];
}

const LANGUAGES = ["English", "Hindi", "Japanese", "Chinese"];
const GENRES = ["Action", "Comedy", "Horror", "Romance"];
const AGE_RATINGS = ["G", "PG", "PG-13", "NC-17"];

export default function AdminDashboard() {
  const [formData, setFormData] = useState<Content>({
    name: "",
    description: "",
    images: {
      thumbnail: "",
      poster: "",
      screenshots: ["", "", ""],
    },
    genre: [],
    duration: 0,
    language: [],
    director: "",
    trailerUrl: "",
    isFeatured: false,
    ageRating: "",
    audioLanguage: [],
    subtitles: [],
  });

  const { toast } = useToast();

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (field: string, value: string, index?: number) => {
    setFormData((prev) => ({
      ...prev,
      images: {
        ...prev.images,
        [field]: index !== undefined
          ? prev.images.screenshots.map((screenshot, i) =>
            i === index ? value : screenshot
          )
          : value,
      },
    }));
  };

  const handleMultiSelect = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item: any) => item !== value)
        : [...prev[field], value],
    }));
  };

  const publishContent = async () => {
    try {
      console.log(formData)
      // const res = await api.post("/api/movie", formData);
      // if (res.status === 200) {
      //   toast({
      //     title: "Content Published Successfully",
      //     description: "Your movie has been added to the database",
      //   });
      // }
    } catch (error) {
      toast({
        title: "Publication Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 min-h-screen w-full flex justify-center items-center">
      <Card className="w-[800px] bg-black text-white">
        <CardHeader>
          <CardTitle>Publish Movie</CardTitle>
          <CardDescription>Add a new movie to the database</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Movie name"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Movie description"
                  className="h-32"
                />
              </div>

              <div className="space-y-2">
                <Label>Images</Label>
                <Input
                  placeholder="Thumbnail URL"
                  value={formData.images.thumbnail}
                  onChange={(e) => handleImageChange("thumbnail", e.target.value)}
                />
                <Input
                  placeholder="Poster URL"
                  value={formData.images.poster}
                  onChange={(e) => handleImageChange("poster", e.target.value)}
                />
                <div className="grid grid-cols-3 gap-2">
                  {formData.images.screenshots.map((screenshot, index) => (
                    <Input
                      key={index}
                      placeholder={`Screenshot ${index + 1}`}
                      value={screenshot}
                      onChange={(e) => handleImageChange("screenshots", e.target.value, index)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="genre">Genre</Label>
                <Select
                  value={formData.genre[0]}
                  onValueChange={(value) => handleMultiSelect("genre", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {GENRES.map((genre) => (
                      <SelectItem key={genre.toLowerCase()} value={genre.toLowerCase()}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => handleInputChange("duration", parseInt(e.target.value))}
                  placeholder="Duration in minutes"
                />
              </div>

              <div>
                <Label htmlFor="director">Director</Label>
                <Input
                  id="director"
                  value={formData.director}
                  onChange={(e) => handleInputChange("director", e.target.value)}
                  placeholder="Director's name"
                />
              </div>

              <div>
                <Label htmlFor="trailerUrl">Trailer URL</Label>
                <Input
                  id="trailerUrl"
                  value={formData.trailerUrl}
                  onChange={(e) => handleInputChange("trailerUrl", e.target.value)}
                  placeholder="YouTube or Vimeo URL"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => handleInputChange("isFeatured", checked)}
                />
                <Label htmlFor="isFeatured">Featured Movie</Label>
              </div>

              <div>
                <Label htmlFor="ageRating">Age Rating</Label>
                <Select
                  value={formData.ageRating}
                  onValueChange={(value) => handleInputChange("ageRating", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select age rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {AGE_RATINGS.map((rating) => (
                      <SelectItem key={rating} value={rating.toLowerCase()}>
                        {rating}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="language">Language</Label>
                <Select
                  value={formData.language[0]}
                  onValueChange={(value) => handleMultiSelect("language", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((language) => (
                      <SelectItem key={language.toLowerCase()} value={language.toLowerCase()}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setFormData({
            name: "",
            description: "",
            images: { thumbnail: "", poster: "", screenshots: ["", "", ""] },
            genre: [],
            duration: 0,
            language: [],
            director: "",
            trailerUrl: "",
            isFeatured: false,
            ageRating: "",
            audioLanguage: [],
            subtitles: [],
          })}>
            Cancel
          </Button>
          <Button onClick={publishContent}>Publish</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
