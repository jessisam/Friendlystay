<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class PropertyController extends Controller
{
    // Public: Get properties list
    public function index()
    {
        try {
            $properties = Property::orderBy('id')->get();
            return response()->json([
                'success' => true,
                'properties' => $properties
            ]);
        } catch (\Exception $e) {
            logger()->error('PropertyController index Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => config('app.debug') ? $e->getMessage() : 'An error occurred while fetching properties.'
            ], 500);
        }
    }

    // Admin: Get properties list
    public function adminIndex()
    {
        return $this->index();
    }

    // Admin: Create new property
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'nullable|string',
            'price_min' => 'nullable|numeric',
            'price_max' => 'nullable|numeric',
            'amenities' => 'nullable|array',
            'whatsapp_link' => 'nullable|string',
            'images' => 'nullable|array',
        ]);

        try {
            $property = Property::create($validated);

            return response()->json([
                'success' => true,
                'property' => $property
            ], 201);
        } catch (\Exception $e) {
            logger()->error('PropertyController store Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => config('app.debug') ? $e->getMessage() : 'An error occurred while creating property.'
            ], 500);
        }
    }

    // Admin: Update existing property
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'nullable|string',
            'price_min' => 'nullable|numeric',
            'price_max' => 'nullable|numeric',
            'amenities' => 'nullable',
            'whatsapp_link' => 'nullable|string',
        ]);

        try {
            $property = Property::findOrFail($id);
            $property->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Property updated'
            ]);
        } catch (\Exception $e) {
            logger()->error('PropertyController update Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => config('app.debug') ? $e->getMessage() : 'An error occurred while updating property.'
            ], 500);
        }
    }

    // Admin: Upload document to Cloudinary / Storage
    public function uploadDocument(Request $request, $id)
    {
        $request->validate([
            'document' => 'required|file|mimes:pdf,doc,docx|max:10240',
        ]);

        try {
            $property = Property::findOrFail($id);
            $url = null;

            // Check if Cloudinary credentials exist, else store locally
            if (env('CLOUDINARY_CLOUD_NAME')) {
                $uploadedFileUrl = Cloudinary::uploadFile($request->file('document')->getRealPath(), [
                    'folder' => 'friendlystay-docs',
                    'resource_type' => 'raw'
                ])->getSecurePath();
                $url = $uploadedFileUrl;
            } else {
                $path = $request->file('document')->store('documents', 'public');
                $url = asset('storage/' . $path);
            }

            $property->update(['document_url' => $url]);

            return response()->json([
                'success' => true,
                'document_url' => $url
            ]);
        } catch (\Exception $e) {
            logger()->error('PropertyController uploadDocument Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => config('app.debug') ? $e->getMessage() : 'An error occurred while uploading document.'
            ], 500);
        }
    }
}
