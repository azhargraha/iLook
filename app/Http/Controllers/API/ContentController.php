<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Pariwisata;

class ContentController extends Controller
{
    public function showPariwisata(){
        $pariwisata = Pariwisata::all();
        return response()->json([
            'status'=>200,
            'pariwisasta' => $pariwisata,
        ]);
    }

    public function showPaket(){
        $paket = Paket::all();
        return response()->json([
            'status'=>200,
            'paket' => $paket,
        ]);
    }

}
